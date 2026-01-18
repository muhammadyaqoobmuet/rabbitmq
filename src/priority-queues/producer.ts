import ampq from "amqplib"

async function producer() {
	try {
		const connection = await ampq.connect('amqp://localhost')
		const channel = await connection.createChannel()
		const EXCHANGE_NAME = "prority_extenge"
		const TOPIC = "direct" // can be any topic
		const QUQUE = 'prority_queue'
		const ROUTING_KEY = 'priroty_key'
		await channel.assertExchange(EXCHANGE_NAME, TOPIC, { durable: true })
		// time to create queue and bind to send messages from exhange

		await channel.assertQueue(QUQUE, { durable: true, arguments: { 'x-max-priority': 10 } })
		// bind with exchnage
		await channel.bindQueue(QUQUE, EXCHANGE_NAME, ROUTING_KEY)

		const data = [
			{
				msg: "hello beta with priority 1",
				priority: 1
			},
			{
				msg: "hello beta with priority 4",
				priority: 4
			},
			{
				msg: "hello beta with priority 7",
				priority: 7
			}
		]

		data.map((msg) => {
			channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(msg.msg), { priority: msg.priority })
		})

		setTimeout(() => connection.close(), 5000)

	} catch (error) {
		console.log(error)
	}
}

producer()