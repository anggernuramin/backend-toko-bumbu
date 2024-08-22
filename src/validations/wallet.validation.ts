import Joi from 'joi'
import { WalletInterface } from '../interfaces/wallet.interface'

export const walletValidation = (payload: WalletInterface) => {
  const schema = Joi.object({
    balance: Joi.number().required(),
    customerId: Joi.number().required()
  })

  return schema.validate(payload)
}
