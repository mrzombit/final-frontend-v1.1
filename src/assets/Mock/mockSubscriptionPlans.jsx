export default SubscriptionPlans = [
    {
        id: 1,
        name: {
            th: " แพ็กเก็จ 1",
            en: " Package 1",
        },
        price: 1000,
        properties: {
            is_ffc: true,
            is_sensitivity: false,
            is_export: false,
            is_compared: true,
        },
        created_date: new Date(),
        is_actived: true,
    },
    {
        id: 2,
        name: {
            th: " แพ็กเก็จ 2",
            en: " Package 2",
        },
        price: 5000,
        properties: {
            is_ffc: true,
            is_sensitivity: true,
            is_export: false,
            is_compared: true,
        },
        created_date: new Date(),
        is_actived: true,
    },
    {
        id: 3,
        name: {
            th: " แพ็กเก็จ 3",
            en: " Package 3",
        },
        price: 9000,
        properties: {
            is_ffc: true,
            is_sensitivity: true,
            is_export: true,
            is_compared: true,
        },
        created_date: new Date(),
        is_actived: true,
    },
]