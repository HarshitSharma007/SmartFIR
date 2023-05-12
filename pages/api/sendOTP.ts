const ACCOUNT_SID = "ACcafd02ddfff81a489ced6788f0b71f2d";
const AUTH_TOKEN = "3b24cf0308c2f95a4d3b93b561c0b949";
const VERIFY_SERVICE_SID = "VA7ad562ae79c66ec53c397098d437b39b";

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

export default async function handler (req, res) {
    try {
        const data = await client
        .verify
        .services(VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+91${req.query.phonenumber}`,
            channel: req.query.channel
        });

        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
};