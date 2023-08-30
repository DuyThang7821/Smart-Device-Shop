import path from "./path"
import icons from "./icons"

export  const navigation = [
    {
        id: 1,
        value: 'TRANG CHỦ',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'TẤT CẢ SẢN PHẨM',
        path: `/${path.PRODUCTS}`
    },

    {
        id: 3,
        value: 'BÀI VIẾT',
        path: `/${path.BLOGS}`
    },

    {
        id: 4,
        value: 'DỊCH VỤ CỦA CHÚNG TÔI',
        path: `/${path.OUR_SERVICES}`
    },

    {
        id: 5,
        value: 'FAQ',
        path: `/${path.FAQ}`
    },
]
const {RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift} = icons
export const productExtraInfomation = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality checked',
        icon: <BsShieldShaded />

    },

    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free on All Products',
        icon: <RiTruckFill />

    },

    {
        id: 3,
        title: 'Free Gift Cards',
        sub: 'Special Gift Cards',
        icon: <AiFillGift />

    },

    {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 days',
        icon: <BsReplyFill />

    },

    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: <FaTty />

    },
]

export const productInfoTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: `Connections: USB 2.0, USB 3.0
        Controls: Onboard touchpad, Bluetooth controllers
        Hardware Platform: Android
        Headset Type: Mobile
        Resolution: 2,560 by 1,440
        Sensors: Motion, presence
        Platform: Samsung Gear VR powered by Oculus
        Supported: Note5, Note7, S6, S6 Edge, S6 Edge+, S7, S7 Edge
        `
    },

    {
        id: 2,
        name: 'WARRANTY',
        content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
        
        `
    },

    {
        id: 3,
        name: 'DELIVERY',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `
    },

    {
        id: 4,
        name: 'PAYMENT',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
        `
    },

    {
        id: 5,
        name: 'CUSTOMER REVIEW',
    },
]

export const colors = [
    'black',
    'brown',
    'gray',
    'white',
    'pink',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
]