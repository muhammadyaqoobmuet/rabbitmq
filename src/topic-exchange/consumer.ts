import amqp from "amqplib"

async function consumer(EXCHANGE_NAME: string, queue: string, pattern: string) {
	// this will consume by creating queue
	// think of like post man will give you letter when you will have post mail box
	try {
		// creating connection
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();
		const TOPIC = "topic";
		await channel.assertExchange(EXCHANGE_NAME, TOPIC, { durable: true });
		await channel.assertQueue(queue, { durable: true });
		await channel.bindQueue(queue, EXCHANGE_NAME, pattern)
		// lets consume like she did to you :) :) LOL
		console.log("waiting for message");
		channel.consume(
			queue, (msg) => {
				if (msg != null) {
					console.log(msg.content.toString());
				}
			}
		)

	} catch (error) {
		console.log(error);
	}
}

export default consumer;