import {ENCODING_TYPES} from "@/constants";

export const encodingSelectOptions = () => {
  const optGroups: T_EncodingOption[] = []
  ENCODING_TYPES.forEach(type => {
    const existIndex = optGroups.findIndex(group => group.type === type.group)
    if(existIndex === -1) {
      optGroups.push({
        type: type.group,
        options: [ type ]
      })
    } else {
      optGroups[existIndex].options.push(type)
    }
  })
  return optGroups
}