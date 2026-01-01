import amqp from "amqplib";

// implement all consumers of direct-exchange here
// this consumer is for SUBSCRIBED_USERS
async function consumer() {
	try {
		// create connection
		const connection = await amqp.connect("amqp://localhost");

		// create channel
		const channel = await connection.createChannel();

		const QUEUE_NAME = "subscribed_user";

		await channel.assertQueue(QUEUE_NAME, {
			durable: false,
		});

		channel.consume(QUEUE_NAME, (msg) => {
			if (!msg) return;

			console.log(
				"received message to subscribed ones",
				JSON.parse(msg.content.toString())
			);

			channel.ack(msg);
		});

	} catch (error) {
		console.log(error);
	}
}

consumer();
