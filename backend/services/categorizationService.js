const categoryKeywords = {
    Food: [
        "swiggy",
        "zomato",
        "restaurant",
        "cafe",
        "coffee",
        "pizza",
        "burger",
        "dominos",
        "mcdonald",
        "kfc",
        "food",
        "breakfast",
        "lunch",
        "dinner"
    ],

    Transport: [
        "uber",
        "ola",
        "rapido",
        "metro",
        "bus",
        "train",
        "petrol",
        "diesel",
        "fuel",
        "cab",
        "taxi",
        "auto"
    ],

    Entertainment: [
        "netflix",
        "spotify",
        "hotstar",
        "prime video",
        "youtube",
        "movie",
        "cinema",
        "pvr",
        "inox",
        "gaming",
        "game"
    ],

    Shopping: [
        "amazon",
        "flipkart",
        "myntra",
        "ajio",
        "shopping",
        "clothes",
        "shoes",
        "mall"
    ],

    Bills: [
        "electricity",
        "water bill",
        "wifi",
        "internet",
        "broadband",
        "mobile recharge",
        "recharge",
        "gas bill",
        "rent"
    ],

    Health: [
        "hospital",
        "doctor",
        "medicine",
        "medical",
        "pharmacy",
        "apollo",
        "clinic",
        "health"
    ],

    Education: [
        "college",
        "course",
        "udemy",
        "coursera",
        "book",
        "exam",
        "fees",
        "tuition"
    ],

    Salary: [
        "salary",
        "stipend",
        "internship",
        "bonus",
        "freelance"
    ]
};

const categorizeTransaction = (title, type) => {
    if (type === "income") {
        return "Income";
    }

    const normalizedTitle = title
        .toLowerCase()
        .trim();

    for (const category in categoryKeywords) {
        const keywords = categoryKeywords[category];

        const matchedKeyword = keywords.find((keyword) =>
            normalizedTitle.includes(keyword)
        );

        if (matchedKeyword) {
            return category;
        }
    }

    return "Other";
};

module.exports = categorizeTransaction;