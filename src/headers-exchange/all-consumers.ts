import consumerOFHeadersExchange from "./consumer";

const consumers = [
	{ "x-match": "any", "notification-type": "liked-video", "content-type": "stream" },
	{ "x-match": "all", "notification-type": "comment", "already-liked": true },
	{ "x-match": "all", "notification-type": "new-video", "content-type": "video" }
];

consumers.forEach(headers => consumerOFHeadersExchange(headers));
