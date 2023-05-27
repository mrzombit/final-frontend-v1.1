export default AssetAccount = [
    {
        id: 1,
        name: {
            th: "ทรัพย์สินถาวรมีตัวตน",
            en: "Tangible Fixed Asset",
        },
        is_fixed_asset: true,
        is_tangible_asset: true,
        created_date: new Date(),
    },
    {
        id: 2,
        name: {
            th: "ทรัพย์สินไม่มีตัวตน",
            en: "Intangible Asset",
        },
        is_fixed_asset: false,
        is_tangible_asset: false,
        created_date: new Date(),
    },
    {
        id: 2,
        name: {
            th: "ทรัพย์สินถาวร",
            en: "Fixed Asset",
        },
        is_fixed_asset: true,
        is_tangible_asset: false,
        created_date: new Date(),
    },
]