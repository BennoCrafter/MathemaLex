function calculate() {
  var raw_nums = document.getElementById("calculation").value;
  var result;
  if (raw_nums.includes("+")) {
    var nums = document.getElementById("calculation").value.split("+");
    var num1 = nums[0];
    var num2 = nums[1];
    result = parseInt(num1) + parseInt(num2);
  }

  if (raw_nums.includes("-")) {
    var nums = document.getElementById("calculation").value.split("-");
    var num1 = nums[0];
    var num2 = nums[1];
    result = parseInt(num1) - parseInt(num2);
  }
  if (raw_nums.includes("*")) {
    var nums = document.getElementById("calculation").value.split("*");
    var num1 = nums[0];
    var num2 = nums[1];
    result = parseInt(num1) * parseInt(num2);
  }
  if (raw_nums.includes("/")) {
    var nums = document.getElementById("calculation").value.split("/");
    var num1 = nums[0];
    var num2 = nums[1];
    result = parseInt(num1) / parseInt(num2);
  }

  if (result === undefined) {
    document.getElementById("calculation").classList.add("invalid");
} else {
    document.getElementById("calculation").classList.remove("invalid");
    document.getElementById("result").innerHTML = result;
}

}
document.getElementById("calculation").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    document.getElementById("add-button").click();
  }
});
