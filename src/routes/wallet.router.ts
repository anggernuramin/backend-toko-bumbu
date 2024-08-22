import { Router } from 'express'
import { createWallet, deleteWallet, getWalletById, getWallets, updateWallet } from '../controllers/wallet.controller'

export const WalletRouter: Router = Router()

WalletRouter.get('/', getWallets)
WalletRouter.get('/:id', getWalletById)
WalletRouter.post('/', createWallet)
WalletRouter.patch('/:id', updateWallet)
WalletRouter.delete('/:id', deleteWallet)
