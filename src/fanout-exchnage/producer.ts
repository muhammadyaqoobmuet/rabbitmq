import amqp from "amqplib"
// basic concept of fanout -> one message to all bounded queues (no routing etc , no wildcard stuff)
// !Important -> when to use -> when notify everyone(alerts,logs etc) , multiple services react immediate
// “User signed up” → send email, log it, update analytics this can be a example
async function producer(productDetails: any) {
	try {
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();
		// well always have exchange and topic/Type
		const EXCHANGE_NAME = 'notifications'
		const TOPIC = "fanout";
		// lets create exchange
		await channel.assertExchange(EXCHANGE_NAME, TOPIC, { durable: true })
		const message = JSON.stringify(productDetails);
		channel.publish(EXCHANGE_NAME, "", Buffer.from(message))
		console.log("done boss");
	} catch (error) {
		console.log(error);
	}
}
producer({ id: 2158, status: "status nhi hai" });