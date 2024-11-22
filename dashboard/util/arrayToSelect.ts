function arrayToReactSelect(array: any[]): { value: string; label: string }[] {
  return array.map(data => ({
    value: data?.id.toString(),
    label: data?.name
  }));
}


export {arrayToReactSelect}