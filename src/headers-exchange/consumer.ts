import amqp from "amqplib";

// ignoring type for learning thats what we do with ts all time
async function consumerOFHeadersExchange(headers: any) {
	try {
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();
		const EXCHANGE_NAME = "headers_exchange";
		await channel.assertExchange(EXCHANGE_NAME, 'headers', { durable: true })
		const q = await channel.assertQueue("", { exclusive: true });
		/// exclusive means a private queue accessible only by the single connection that declared it, automatically deleted when that connection closes
		await channel.bindQueue(q.queue, EXCHANGE_NAME, "", headers)
		channel.consume(q.queue, (message) => {
			if (message != null) {
				console.log(message.content.toString());
				console.log("message received");
			}
		})
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.error(error)
		}

	}
}

export default consumerOFHeadersExchange