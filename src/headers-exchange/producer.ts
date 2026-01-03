import amqp from 'amqplib'
// this is same as other but the key different is the we apply more than more conditions in headers and it should
// match any or all headers same as topic but  more than one conditions

async function producer(headers: any, message: any) {
	try {
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();
		const EXCHANGE_NAME = "headers_exchange";
		const TYPE = "headers"
		// routing key -> "" -> no routing key
		await channel.assertExchange(EXCHANGE_NAME, TYPE, { durable: true });
		channel.publish(
			EXCHANGE_NAME,
			'', // routing key is empty for headers exchange
			Buffer.from(typeof message !== 'string' ? message.toString() : message),
			{ headers, persistent: true }
		);
		setTimeout(() => connection.close(), 500)
	} catch (e) {
		console.log(e);
	}
}

producer({ "x-match": "all", "notification-type": "new-video", "content-type": "video" }, "new video upload by pistu faqeer")
producer({ "x-match": "any", "notification-type": "liked-video", "content-type": "stream" }, "someone liked your video")
producer({ "x-match": "all", "notification-type": "comment", "already-liked": true }, "some one liked , has commented")