import amqp from "amqplib"

async function consumer() {
	try {
		const connection = await amqp.connect('amqp://localhost')
		const channel = await connection.createChannel()
		const QUQUE = 'prority_queue'
		await channel.assertQueue(QUQUE, { durable: true, arguments: { 'x-max-priority': 10 } })
		channel.consume(QUQUE, (msg) => {
			if (msg !== null) {
				console.log("message", msg.content.toString())
			}
		})

	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message)
		}
		console.error(error)
	}
}

consumer()