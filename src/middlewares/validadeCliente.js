const validateCliente = (req, res, next) => {
    const { nomeCliente, email } = req.body;

    if (!nomeCliente || typeof nomeCliente !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos.' });
    }

    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({ msg: 'Campo email invalido.' })
    }

    next();

}

const validadeClienteId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ msg: 'Parametro id inválido.' })
    }
    next();
}

module.exports = { validateCliente, validadeClienteId };