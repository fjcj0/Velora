import axios from "axios";
import CryptoJS from "crypto-js";
export const sendEmail = async ({
    from,
    to,
    subject,
    html
}) => {
    try {
        const encryptedSecret = CryptoJS.AES.encrypt(
            process.env.SECRET_KEY,
            process.env.ENCRYPTION_KEY
        ).toString();
        await axios.post(
            `${process.env.EMAIL_ENDPOINT}/send-email`,
            {
                from,
                to,
                subject,
                html
            },
            {
                headers: {
                    "x-secret-key": encryptedSecret
                }
            }
        );
    } catch (error) {
        console.log(error.message);
        throw new Error(String(error));
    }
};