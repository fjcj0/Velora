export const csrf = async (request, response) => {
    const csrfToken = generateCsrfToken();
    response.cookie("csrfToken", csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    });
    return response.status(201).json({ csrfToken });
}