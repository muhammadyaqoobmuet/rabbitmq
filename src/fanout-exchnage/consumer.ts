import amqp from "amqplib"
// asume this is a single service it can be any
async function consumer() {
	try {
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();
		// well always have exchange and topic/Type
		const EXCHANGE_NAME = 'notifications'
		const TOPIC = "fanout";
		// till here everything is same
		const q = await channel.assertQueue("", { exclusive: true }); // temp queue after conec close it will vanish like her
		console.log(`waiting for message ${q.queue.toString()}`); // will genrate new everytime
		channel.bindQueue(q.queue, EXCHANGE_NAME, '');
		channel.consume(q.queue, (msq) => {
			if (msq != null) {
				console.log(msq.content.toString());
			}
		})
	} catch (error) {
		console.log(error);
	}
}
consumer();