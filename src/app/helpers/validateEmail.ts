export default function validateEmail(email:string) {
    // Using a regular expression to validate the email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}