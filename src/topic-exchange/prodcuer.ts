import amqp from "amqplib";

async function producer(routing_key: string, message: string) {
	// this is same as direct exchange but we use wildcard routing keys for sending messages to queues
	// direct was stricter like :- give me i will send to exact address otherwise :) i wont

	// workflow -> Producer sends message to exchange exchange helps to send message via binding to queue made by consumer
	//							with wildcard matchmaking
	try {
		const connection = await amqp.connect('amqp://localhost');
		console.log("connection on ");
		const channel = await connection.createChannel();
		// assert exchange then queue
		const EXCHANGE_NAME = 'nigga_exchange';
		const TOPIC = "topic";
		await channel.assertExchange(EXCHANGE_NAME, TOPIC, { durable: true });
		// await channel.assertQueue() we don't add queue here
		channel.publish(EXCHANGE_NAME, routing_key, Buffer.from(message), { persistent: true })
		console.log("message sent to ", routing_key);
		setTimeout(() => connection.close(), 500);
		console.log("connection closed!");
	} catch (error) {
		console.log(error);
	}
}
// lets send two messages
producer('order.placed', JSON.stringify({ orderId: 512491561, shippingAddress: "Life is Curse", status: true }))
producer('payment.pending', JSON.stringify({ paymentId: 512491561, paymentDetails: "just like her fucked up", status: true }))
