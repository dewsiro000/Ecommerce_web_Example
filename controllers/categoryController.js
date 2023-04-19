// import categoryModel from "../models/categoryModel"

// export const createCategoryController = async (req, res) => {
//     try {
//         const { name } = req.body
//         if (!name) {
//             return res.status(401).send({ message: 'Name is required' })
//         }
//         const exisitingCategory = await categoryModel.findOne({name})

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             succes: false,
//             error,
//             message: 'Error in Category'
//         })

//     }
// }