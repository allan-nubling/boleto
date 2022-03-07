/* eslint-disable no-console */
import { Router } from 'express'

export async function attach(router: Router): Promise<void> {
    router.get('/ping', async (req, res) => {
        try {
            res.status(200).json({
                name: process.env.npm_package_name,
                version: process.env.npm_package_version,
                env: process.env.NODE_ENV
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
}
