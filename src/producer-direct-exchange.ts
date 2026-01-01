import amqp from "amqplib"


// What we are implementing assume we have two services one for sending mail and one for sending message body to that services
// eg one sends {to:jack@gmail.com,subject:Wo bhi apna na hwa , body:dil bhi gaaya hathon sa esa ana sa to behhtr tha na ana dil ka }


async function directExchangeProducer() {
	try {
		// we first create connection
		const connection = await amqp.connect('amqp://localhost'); // amqp -> advance message queue protocol
		// create a channel now
		const channel: amqp.Channel | null = await connection.createChannel();
		// creating exchange meta data
		const EXCHANGE_NAME = 'mail_exchange';
		const TOPIC = "direct";
		// creating exchange
		await channel.assertExchange(EXCHANGE_NAME, TOPIC, { durable: false }); // durable means persistence allowed or not
		// remember direct type of exchange
		// uses routing key for binding to exchange with queues with same routing key
		const ROUTING_KEY = 'naksum'; // sometimes its really weird how i use different name those who doesnt even blongs to me
		// lets create queue as its direct exchange
		await channel.assertQueue('onesided', { durable: false });		// it takes queue: string, options?: Options.AssertQueue
		// now we have created queue and exchange  lets bind them // !why binding ??
		// because this is the way it works it bind/connect them sends message its not magic
		await channel.bindQueue(
			'onesided',
			EXCHANGE_NAME,
			ROUTING_KEY
		);
		// lets create a message to send
		const messageEmailMetaData = {
			to: "yaqoobhalepoto@gmail.com",
			from: "jack@gmail.com",
			subject: "implemented direct exchange",
			body: "its me again falling for her but not for her "
		}
		// sending(publishing) message
		//		publish(exchange: string, routingKey: string, content: Buffer, options?: Options.Publish): boolean;

		const messageSend: boolean = channel.publish(
			EXCHANGE_NAME,
			ROUTING_KEY,
			Buffer.from(JSON.stringify(messageEmailMetaData)),
		)
		if (!messageSend) {
			console.log("something went really really wrong as it went on 17oct 2024"); // LOL
			return
		}
		console.log("message sent!!");
		// close the fkn connection
		setTimeout(() => connection.close(), 500);

	} catch (error) {
		console.log(error);
	}
}


// run the function
directExchangeProducer()