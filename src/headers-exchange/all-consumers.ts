
// This file starts all three consumers for the headers exchange in RabbitMQ.
// Each consumer listens for a different set of headers (like, comment, new video notifications).
// Instead of running three separate files, you can use this single entry point.
// To start all consumers: npm run start-consumers-headers-exchange
// Make sure RabbitMQ is running locally on amqp://localhost
//
// Each object in the array below represents the headers for a different consumer.
// You can add or modify consumers by editing this array.
import consumerOFHeadersExchange from "./consumer";


const consumers = [
	// Consumer for liked video notifications
	{ "x-match": "any", "notification-type": "liked-video", "content-type": "stream" },
	// Consumer for comment notifications (only if already liked)
	{ "x-match": "all", "notification-type": "comment", "already-liked": true },
	// Consumer for new video upload notifications
	{ "x-match": "all", "notification-type": "new-video", "content-type": "video" }
];


consumers.forEach(headers => consumerOFHeadersExchange(headers));
