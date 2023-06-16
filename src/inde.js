export const getAllProduct = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // default to page 1 and limit of 10
    const offset = (page - 1) * limit; // calculate the offset
    const getProducts = await findProduct.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    if (getProducts) {
      return res.json({
        success: true,
        message: "Products found successfully!",
        data: getProducts,
      });
    } else {
      return res.json({
        success: false,
        message: "Products not found!",
        data: [],
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};