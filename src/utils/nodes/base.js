const ConstantNumber = function () {
  this.type = "basic/number"
  this.pos = {
    x: 100,
    y: 100
  }
  this.properties = {
    value: Math.round( Math.random() * 10 )
  }
  this.outputs = [
    {
      name: "value",
      type: "number",
      link: null
    }
  ]
}

export default ConstantNumber;