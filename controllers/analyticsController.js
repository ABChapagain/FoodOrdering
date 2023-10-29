import productModel from '../models/productModel.js'

export const getAnalytics = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category')

    const categoryCounts = {}

    if (!products) {
      return res.status(404).json({ message: 'Products not found' })
    }
    products.forEach((item) => {
      const categoryName = item.category.name
      if (categoryCounts[categoryName]) {
        categoryCounts[categoryName]++
      } else {
        categoryCounts[categoryName] = 1
      }
    })
    const categoryTotals = Object.keys(categoryCounts).map((categoryName) => ({
      category: categoryName,
      productCount: categoryCounts[categoryName],
    }))

    res.json({ categoryTotals })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}
