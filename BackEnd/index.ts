import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
var cors = require('cors')

const prisma = new PrismaClient()
const app = express()
const port = 8000
const host = '0.0.0.0'

app.use(express.json())

  app.use(cors({
    origin: '*'
  }));
  app.get(`/api/tags`, async (request, response) => {
    const tags = await prisma.tags.findMany( {
        orderBy: {
            id: 'asc'
        },})
    response.json(tags)
  })
  app.post(`/api/tags`, async (req, res) => {
    const { name } = req.body
    const result = await prisma.tags.create({
      data: {
        name,
      },
    })
    res.json(result)
  })
  app.put('/api/tags/:id', async (req, res) => {

   
    const { id } = req.params
    const data  = req.body

    try{     
  
      const updatedTag = await prisma.tags.update({
        where: { id: Number(id) },
        data: { name: data.name },
      })
      res.json(updatedTag)
    } catch (error) {
      res.json({ error: `Тега ${id} не найдено` })
    }
  })
  app.delete(`/api/tags/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.tags.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })



  app.get(`/api/categories`, async (request, response) => {
    const categories = await prisma.categories.findMany( {
        orderBy: {
            id: 'asc'
        },})
    response.json(categories)
  })
  app.post(`/api/categories`, async (req, res) => {
    const { name } = req.body
    const result = await prisma.categories.create({
      data: {
        name,
      },
    })
    res.json(result)
  })
  app.put('/api/categories/:id', async (req, res) => {
    const { id } = req.params
    const data  = req.body

    try{     
  
      const result = await prisma.categories.update({
        where: { id: Number(id) },
        data: { name: data.name },
      })
      res.json(result)
    } catch (error) {
      res.json({ error: `Категории ${id} не найдено` })
    }
  })
  app.delete(`/api/categories/:id`, async (req, res) => {
    const { id } = req.params
    try{    
        const result = await prisma.categories.delete({
        where: {
            id: Number(id),
        },
        })
        res.json(result)
    } catch (error) {
        res.json({ error: `Категории ${id} не найдено` })
      }
  })


  app.get(`/api/products`, async (request, response) => {
    const products = await prisma.products.findMany( {
        orderBy: {
            id: 'asc'
        },
        include: {
          tag: {
            select: {
              tagId: true,
            },
          },
        },
      })
    response.json(products)
  })
  app.post(`/api/products`, async (req, res) => {
    const data  = req.body
    const tags = data.tags as number[]
    const product = {
        calories: Number(data.product.calories),
        image:  data.product.image,
        price: Number(data.product.price),
        name:  data.product.name,
        short_name: data.product.short_name,
        weight: Number(data.product.weight),
        categoryId: data.product.categoryId,
        subCategoryId: 0
      }
     const result = await prisma.products.create({
      data: product,
    })

    const ProductTag = tags.map( tagId => { return { tagId, productId: result.id}})
    const resultTag = await prisma.productTag.createMany({
        data: ProductTag,
      })    
    res.json({result, resultTag})
  })
  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params
    const data  = req.body
    const tags = data.tags as number[]

    const product = {
      calories: data.product.calories ? parseInt(data.product.calories) : 0,
      image:  data.product.image,
      price: data.product.price ? parseInt(data.product.price): 0,
      name:  data.product.name,
      short_name: data.product.short_name,
      weight: data.product.weight ? parseInt(data.product.weight) : 0,
      categoryId: data.product.categoryId,
      subCategoryId: 0
    }
    try{     
  
      const result = await prisma.products.update({
        where: { id: Number(id) },
        data:  product,
      })
      const resultDelTag = await prisma.productTag.deleteMany({
        where: {
            productId:  Number(id)
          },
        })
      const ProductTag = tags.map( tagId => { return { tagId, productId: Number(id)}})
      const resultTag = await prisma.productTag.createMany({
        data: ProductTag,
      })   
      res.json(result)
    } catch (error) {
      res.json({ error: `Блюдо ${id} не найдено` })
    }
  })
  app.delete(`/api/products/:id`, async (req, res) => {
    const { id } = req.params
    try{    
        
        const result = await prisma.products.delete({
        where: {
            id: Number(id),
        },
        })
        res.json(result)
    } catch (error) {
        res.json({ error: `Блюдо ${id} не найдено` })
      }
  })


const server = app.listen(port, host, () =>
  console.log(`Server ready at: http://${host}:${port}`)
)