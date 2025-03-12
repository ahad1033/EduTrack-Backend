import { IShop } from "./shop.interface";
import { Shop } from "./shop.model";

const createShop = async (shopData: IShop) => {
  try {
    const shop = new Shop(shopData);
    return await shop.save();
  } catch (error) {
    throw new Error("Failed to create shop");
  }
};

const getAllShop = async () => {
  try {
    const shops = await Shop.find();
    return shops;
  } catch (error) {
    throw new Error("Failed to fetch shops");
  }
};

const getShopById = async (shopId: string) => {
  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  } catch (error) {
    throw new Error("Failed to fetch shop");
  }
};

const updateShopById = async (shopId: string, updateData: Partial<IShop>) => {
  try {
    const shop = await Shop.findByIdAndUpdate(shopId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  } catch (error) {
    throw new Error("Failed to update shop");
  }
};

const deleteShopById = async (shopId: string) => {
  try {
    const shop = await Shop.findByIdAndDelete(shopId);
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  } catch (error) {
    throw new Error("Failed to delete shop");
  }
};

const getShopsWithoutUser = async () => {
  try {
    const shops = await Shop.find({ userId: { $exists: false } });
    return shops;
  } catch (error) {
    throw new Error("Failed to fetch shops without a user");
  }
};

export const ShopServices = {
  createShop,
  getAllShop,
  getShopById,
  updateShopById,
  deleteShopById,
  getShopsWithoutUser,
};
