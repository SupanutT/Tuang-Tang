module.exports.cleanData = (data) => {
    function isEnglish(word) {
        if (word.match(/^[a-z0-9_.,'"!?;:& ]+$/i)) {
            return true;
        }
        return false;
    }
    const mappedData = data.map((item) => {
        const { description, amount, qty } = item;
        const lastChar = description.slice(-1);
        const modifiedQty = isNaN(parseInt(lastChar, 10)) ? qty : parseInt(lastChar, 10);
        const validatedQty = modifiedQty === null ? 1 : modifiedQty;
        const modifiedDescription = isNaN(parseInt(lastChar, 10)) ? description : description.slice(0, -1);
        const trimmedDescription = isEnglish(modifiedDescription) ? modifiedDescription : modifiedDescription.replace(/\s+/g, '');
        const price = amount / validatedQty;
        return {
            menu: trimmedDescription,
            price: price,
            quantity: validatedQty
        };
    });
    return mappedData;
};