import path from "./path";
import icons from "./icons";

export const navigation = [
  {
    id: 1,
    value: "TRANG CHỦ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "TẤT CẢ SẢN PHẨM",
    path: `/${path.PRODUCTS}`,
  },

  {
    id: 3,
    value: "BÀI VIẾT",
    path: `/${path.BLOGS}`,
  },

  {
    id: 4,
    value: "DỊCH VỤ CỦA CHÚNG TÔI",
    path: `/${path.OUR_SERVICES}`,
  },

  {
    id: 5,
    value: "FAQ",
    path: `/${path.FAQ}`,
  },
];
const { RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift } = icons;
export const productExtraInfomation = [
  {
    id: 1,
    title: "Bảo đảm",
    sub: "Đã kiểm tra chất lượng",
    icon: <BsShieldShaded />,
  },

  {
    id: 2,
    title: "Miễn phí vận chuyển",
    sub: "Miễn phí trên các sản phẩm",
    icon: <RiTruckFill />,
  },

  {
    id: 3,
    title: "Thẻ quà tặng",
    sub: "Miễn phí thẻ quà tặng",
    icon: <AiFillGift />,
  },

  {
    id: 4,
    title: "Hoàn trả miễn phí",
    sub: "Trong vòng 7 ngày",
    icon: <BsReplyFill />,
  },

  {
    id: 5,
    title: "Tư vấn",
    sub: "Hỗ trợ 24/7",
    icon: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "MÔ TẢ",
    content: `Connections: USB 2.0, USB 3.0
        Controls: Onboard touchpad, Bluetooth controllers
        Hardware Platform: Android
        Headset Type: Mobile
        Resolution: 2,560 by 1,440
        Sensors: Motion, presence
        Platform: Samsung Gear VR powered by Oculus
        Supported: Note5, Note7, S6, S6 Edge, S6 Edge+, S7, S7 Edge
        `,
  },

  {
    id: 2,
    name: "BẢO ĐẢM",
    content: `BẢO ĐẢM THÔNG TIN
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
        
        `,
  },

  {
    id: 3,
    name: "VẬN CHUYỂN",
    content: `THU MUA VÀ VẬN CHUYỂN
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `,
  },

  {
    id: 4,
    name: "THANH TOÁN",
    content: `
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];
export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },

  {
    id: 2,
    value: "-title",
    text: "Alphabetically, A-Z",
  },

  {
    id: 3,
    value: "title",
    text: "Alphabetically, Z-A",
  },

  {
    id: 4,
    value: "-price",
    text: "Price, high to low",
  },

  {
    id: 5,
    value: "price",
    text: "Price, low to high",
  },

  {
    id: 6,
    value: "-createdAt",
    text: "Date, new to old",
  },

  {
    id: 7,
    value: "createdAt",
    text: "Date, old to new",
  },
];

export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },

  {
    id: 2,
    text: "Bad",
  },

  {
    id: 3,
    text: "Neutral",
  },

  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];

const { AiOutlineDashboard, MdGroups, TbBrandProducthunt, RiBillLine } = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Tổng quan",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "Quản lí tài khoản",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20} />,
  },

  {
    id: 3,
    type: "PARENT",
    text: "Quản lí sản phẩm",
    icon: <TbBrandProducthunt size={20} />,
    submenu: [
      {
        text: "Tạo sản phẩm mới",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },

      {
        text: "Quản lí sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },

  {
    id: 4,
    type: "SINGLE",
    text: "Quản lí đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20} />,
  },
];


export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Thông tin cá nhân",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "Giỏ hàng",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups size={20} />,
  },

  {
    id: 4,
    type: "SINGLE",
    text: "Lịch sử mua hàng",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },

  {
    id: 4,
    type: "SINGLE",
    text: "Sản phẩm yêu thích",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <RiBillLine size={20} />,
  },
];

export const roles = [
  {
    code: 1945,
    value: "Admin",
  },

  {
    code: 1979,
    value: "User",
  },
];

export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },

  {
    code: false,
    value: "Active",
  },
];

export const statusOrders = [
  {
    label: 'Cancelled',
    value: 'Cancelled'
  },

  {
    label: 'Succeed',
    value: 'Succeed'
  },


]
