import specialtyService from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(info);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
}

module.exports = {
    createSpecialty: createSpecialty
}