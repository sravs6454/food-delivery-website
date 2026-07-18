
import Order from '../models/orderModel.js';


export const getTopSellingToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({ date: { $gte: today } });

    const itemMap = new Map();

    orders.forEach(order => {
      order.items.forEach(item => {
        const key = item.name;

        if (itemMap.has(key)) {
          const existing = itemMap.get(key);
          existing.count += item.quantity || 1;
        } else {
          itemMap.set(key, {
            name: item.name,
            price: item.price,
            image: item.image,
            count: item.quantity || 1
          });
        }
      });
    });

    const topItems = [...itemMap.values()]
      .filter(item => item.count >= 3) // ✅ Only include items ordered more than 2 times
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({ topSellingToday: topItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top-selling items' });
  }
};



