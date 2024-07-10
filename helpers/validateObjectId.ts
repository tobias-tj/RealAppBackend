import { isValidObjectId } from "mongoose"

const ValidateObjectId = (id: unknown) => {
    if(isValidObjectId(id)) return true

    return false
}

export default ValidateObjectId