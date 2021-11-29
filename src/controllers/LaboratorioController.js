const authMiddleware = require('../middlewares/auth');
const express = require('express');
const Laboratorio = require('../models/Laboratorio');
const LaboratorioMunicipio = require('../models/LaboratorioMunicipio');

// UTILITY
const allowFunction = require('../util/allowFunction');

const router = express.Router();
router.use(authMiddleware);

/**
 * Retorna a lista de laboratórios de um município
 */
 getLaboratorio = async ( req, res ) => {
  const { municipio_id } = req.params;
  /*
  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });
  */

  const laboratorios = await Laboratorio.findAll({
    include: {
      association: 'municipios',
      where: {
        id: municipio_id
      }
    }
  });

  res.json( laboratorios );
  }

  createLaboratorio = async(req, res) =>{
    const {cnpj, nome, endereco, tipo_laboratorio, municipio_id} = req.params

    const laboratorio = await Laboratorio.create({
      cnpj,
      nome,
      endereco,
      tipo_laboratorio
    })
    
    const lab_municipios = await LaboratorioMunicipio.create({
      cnpj,
      municipio_id
    })

    return res.status(200).json(laboratorio)
  }

  updateLaboratorio = async(req, res) =>{
    const {cnpj_id, cnpj, nome, endereco, tipo_laboratorio, created_at, municipio_id} = req.params
    var values = {cnpj: cnpj,
      nome: nome,
      endereco: endereco,
      tipo_laboratorio: tipo_laboratorio,
      created_at: created_at
    }
    var selector = {where: {
      cnpj: cnpj_id
    }}

    const { isRejected } = await Laboratorio.update(values, selector);

    return res.status(200).json({cnpj_id: cnpj_id, values})
    
  }

router.get( '/:municipio_id', getLaboratorio );
router.post( '/:cnpj/cnpj/:nome/nome/:endereco/endereco/:tipo_laboratorio/tipo_laboratorio/:municipio_id/municipios', createLaboratorio);
router.put( '/:cnpj_id/cnpj_id/:cnpj/cnpj/:nome/nome/:endereco/endereco/:tipo_laboratorio/tipo_laboratorio/:created_at/created_at/:municipio_id/municipios', updateLaboratorio);

module.exports = app => app.use('/laboratorios', router);