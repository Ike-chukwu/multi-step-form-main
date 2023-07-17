const stepIndicators = document.querySelectorAll(".container .left .step .one");
const rightSideOfContainer = document.querySelector(".container .right");
const editedContainer = document.querySelector(
  ".container .right #edited-content"
);
const TitleContainer = document.querySelector(
  ".container .right .title-container"
);
const dynamicContent = document.querySelector(
  ".container .right .input-container #dynamic-content"
);
const nav = document.querySelector(".container .right .navs");
const btn = document.querySelector(".container .right .navs .btn");
const backBtn = document.querySelector(".container .right .navs a");
let planData = [{ level: "Arcade", amount: "$9/mo" }];
let subscriptionDuration = "Monthly";
let selectedCard;
let sliderState = "";

let formName = "";
let formMail = "";
let formNum = "";

//addons data
const addOnBulk = [];
let cost = 0;
let actualInputParent;
let counter = 0;
let levelAmount;

function pageIncrease() {
  counter++;

  if (counter == 1) {
    const name = document.querySelector(".input-fields .name").value;
    const email = document.querySelector(".input-fields .email").value;
    const number = document.querySelector(".input-fields .number").value;
    formName = name;
    formMail = email;
    formNum = number;
    if (formName && formMail && formNum) {
      renderPages();
      return;
    } else {
      if (name === "" || email === "" || number === "") {
        if (name === "") {
          document.querySelector(".input-fields .name").style.border =
            "0.1rem solid  hsl(354, 84%, 57%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[0]
            .classList.remove("notactive");
        } else {
          document.querySelector(".input-fields .name").style.border =
            ".1rem solid hsl(229, 24%, 87%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[0]
            .classList.add("notactive");
        }
        if (email === "") {
          document.querySelector(".input-fields .email").style.border =
            "0.1rem solid  hsl(354, 84%, 57%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[1]
            .classList.remove("notactive");
        } else {
          document.querySelector(".input-fields .email").style.border =
            ".1rem solid hsl(229, 24%, 87%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[1]
            .classList.add("notactive");
        }
        if (number === "") {
          document.querySelector(".input-fields .number").style.border =
            "0.1rem solid  hsl(354, 84%, 57%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[2]
            .classList.remove("notactive");
        } else {
          document.querySelector(".input-fields .number").style.border =
            ".1rem solid hsl(229, 24%, 87%)";
          document
            .querySelectorAll(".input-fields .sub-title-pack .error-message")[2]
            .classList.add("notactive");
        }
        counter = 0;
        return;
      } else {
        const inputs = document.querySelectorAll(".input-fields input");
        inputs.forEach((input) => {
          input.style.border = ".1rem solid hsl(229, 24%, 87%)";
        });
      }
    }
  }
  //when counter === 2

  if (counter > 4) {
    return;
  } else {
    if (counter == 3 && addOnBulk.length == 0) {
      counter = 2;
      return;
    } else {
      renderPages();
    }
  }
}

function pageDecrease() {
  counter--;
  console.log(counter);
  if (counter < 0) {
    counter = 0;
    return;
  } else {
    renderPages();
  }
}

btn.addEventListener("click", pageIncrease);
backBtn.addEventListener("click", pageDecrease);

function renderPages() {
  toggleIndicator();
  if (counter == 0) {
    TitleContainer.innerHTML = `
        <h1 class="title">Personal info</h1>
          <p class="title-insight">
            Please provide your name, email address, and phone number.
        </p>
        `;
    editedContainer.classList = "input-container";
    dynamicContent.innerHTML = `
    <div class="inputs">
    <div class="input-fields">
      <div class="sub-title-pack">
        <p class="sub-title">Name</p>
        <p class="error-message notactive">This field is required</p>
      </div>
      <input
        type="text"
        placeholder="e.g. Stephen King"
        value=${formName}
        class="name"
        autocomplete="off"
      />
    </div>
    <div class="input-fields">
      <div class="sub-title-pack">
      <p class="sub-title">Email Address</p>
      <p class="error-message notactive">This field is required</p>
    </div>
      <input
        type="email"
        placeholder=" e.g. stephenking@lorem.com"
        value=${formMail}
        class="email"
        autocomplete="off"
      />
    </div>
    <div class="input-fields">
      <div class="sub-title-pack">
      <p class="sub-title">Phone Number</p>
      <p class="error-message notactive">This field is required</p>
    </div>
      <input
        type="text"
        placeholder="e.g. +1 234 567 890"
        value=${formNum}
        class="number"
        autocomplete="off"
      />
    </div>
  </div>
        `;
    nav.classList.add("first");
    nav.classList.remove("finishup");
    nav.classList.remove("addons");
    backBtn.classList.add("absent");
  } else {
    if (counter == 1) {
      TitleContainer.innerHTML = `
        <h1 class="title">Select your plan</h1>
            <p class="title-insight">
              You have the option of monthly or yearly billing.
            </p>
        `;
      editedContainer.classList = "cards";
      backBtn.classList.remove("absent");
      dynamicContent.innerHTML = `
        <div class="card-container">
        <div class="card active" data-number="0">
          <img src="./assets/images/icon-arcade.svg" alt="">
          <div class="ps">
          <p class="sub-title">Arcade</p>
          <p class="costPerYear">$9/mo</p>
        </div>
        </div>
        <div class="card" data-number="1">
            <img src="./assets/images/icon-advanced.svg" alt="">
            <div class="ps">
            <p class="sub-title">Advanced</p>
            <p class="costPerYear">$12/mo</p>
            </div>
        </div>
        <div class="card" data-number="2">
            <img src="./assets/images/icon-pro.svg" alt="">
            <div class="ps">
            <p class="sub-title">Pro</p>
            <p class="costPerYear">$15/mo</p>
            </div>
        </div>
      </div>
      <div class="duration">
        <span class="month time active">Monthly</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
        <span class="year time">Yearly</span>
      </div> 
        `;

      const cards = dynamicContent.querySelectorAll(".card");
      const input = dynamicContent.querySelector("input");
      if (selectedCard) {
        cards.forEach((card) => {
          card.classList.remove("active");
        });
        cards[selectedCard].classList.add("active");
        console.log(selectedCard);
        if (sliderState === "checked") {
          input.checked = true;
          const psList = dynamicContent.querySelectorAll(".ps");
          const costPerYear = dynamicContent.querySelectorAll(".costPerYear");
          for (let i = 0; i < costPerYear.length; i++) {
            if (i == 0) {
              costPerYear[i].textContent = "$90/yr";
            }
            if (i == 1) {
              costPerYear[i].textContent = "$120/yr";
            }
            if (i == 2) {
              costPerYear[i].textContent = "$150/yr";
            }
          }
          psList.forEach((p) => {
            const paragraphTag = document.createElement("p");
            paragraphTag.classList = "length-of-free";
            paragraphTag.textContent = "2 months free";
            p.appendChild(paragraphTag);
          });
          const year = document.querySelector(".year");
          const month = document.querySelector(".month");
          year.classList.add("active");
          month.classList.remove("active");
        } else {
          input.checked = false;
          const costPerYear = dynamicContent.querySelectorAll(".costPerYear");
          for (let i = 0; i < costPerYear.length; i++) {
            if (i == 0) {
              costPerYear[i].textContent = "$9/mo";
            }
            if (i == 1) {
              costPerYear[i].textContent = "$12/mo";
            }
            if (i == 2) {
              costPerYear[i].textContent = "$15/mo";
            }
          }
          const year = document.querySelector(".year");
          const month = document.querySelector(".month");
          year.classList.remove("active");
          month.classList.add("active");
        }
      }

      cards.forEach((card) => {
        card.addEventListener("click", function () {
          cards.forEach((card) => {
            card.classList.remove("active");
          });
          const clickedCard = this;
          selectedCard = this.getAttribute("data-number");
          this.classList.add("active");
          const level = clickedCard.querySelector(".sub-title").textContent;
          const charges = clickedCard.querySelector(".costPerYear").textContent;
          const objD = { level, amount: charges };
          if (planData.length == 1) {
            planData[0] = objD;
          }
          console.log(planData);
        });
      });
      console.log(input);
      input.addEventListener("change", function (e) {
        if (e.target.checked === true) {
          console.log("yes");
          const psList = dynamicContent.querySelectorAll(".ps");
          const costPerYear = dynamicContent.querySelectorAll(".costPerYear");
          for (let i = 0; i < costPerYear.length; i++) {
            if (i == 0) {
              costPerYear[i].textContent = "$90/yr";
            }
            if (i == 1) {
              costPerYear[i].textContent = "$120/yr";
            }
            if (i == 2) {
              costPerYear[i].textContent = "$150/yr";
            }
          }
          psList.forEach((p) => {
            const paragraphTag = document.createElement("p");
            paragraphTag.classList = "length-of-free";
            paragraphTag.textContent = "2 months free";
            p.appendChild(paragraphTag);
          });
          const year = document.querySelector(".year");
          const month = document.querySelector(".month");
          year.classList.add("active");
          month.classList.remove("active");
          subscriptionDuration = "Yearly";
          console.log(subscriptionDuration);
          sliderState = "checked";
          if (planData.length > 0) {
            if (planData[0].amount === "$9/mo") {
              planData[0].amount = costPerYear[0].textContent;
            }
            if (planData[0].amount === "$12/mo") {
              planData[0].amount = costPerYear[1].textContent;
            }
            if (planData[0].amount === "$15/mo") {
              planData[0].amount = costPerYear[2].textContent;
            }
          }
          console.log(planData[0].amount);
        } else {
          console.log("no");
          const monthlength = dynamicContent.querySelectorAll(
            ".ps .length-of-free"
          );
          monthlength.forEach((length) => {
            length.remove();
          });
          const costPerYear = dynamicContent.querySelectorAll(".costPerYear");
          for (let i = 0; i < costPerYear.length; i++) {
            if (i == 0) {
              costPerYear[i].textContent = "$9/mo";
            }
            if (i == 1) {
              costPerYear[i].textContent = "$12/mo";
            }
            if (i == 2) {
              costPerYear[i].textContent = "$15/mo";
            }
          }
          const year = document.querySelector(".year");
          const month = document.querySelector(".month");
          year.classList.remove("active");
          month.classList.add("active");
          subscriptionDuration = "Monthly";
          sliderState = "";
          if (planData.length > 0) {
            if (planData[0].amount === "$90/yr") {
              planData[0].amount = costPerYear[0].textContent;
            }
            if (planData[0].amount === "$120/yr") {
              planData[0].amount = costPerYear[1].textContent;
            }
            if (planData[0].amount === "$150/yr") {
              planData[0].amount = costPerYear[2].textContent;
            }
          }
        }
        console.log(subscriptionDuration);
      });
      nav.classList.remove("first");
      nav.classList.remove("addons");
      nav.classList.remove("finishup");
    }

    if (counter == 2) {
      TitleContainer.innerHTML = `
        <h1 class="title">Pick add-ons</h1>
        <p class="title-insight">
          Add-ons help enhance your gaming experience.
        </p>
        `;
      editedContainer.classList = "selctions-container";
      dynamicContent.innerHTML = `<div class="selections">
        <div class="select" >
          <div class="checker">
            <input type="checkbox" />
            <div class="ps">
              <p class="sub-title">Online service</p>
              <p class="costPerYear">Access to multiplayer games</p>
            </div>
          </div>
          <p class="length-of-free">+$1/mo</p>
        </div>
        <div class="select" >
          <div class="checker">
            <input type="checkbox" />
            <div class="ps">
              <p class="sub-title">Larger storage</p>
              <p class="costPerYear">Extra 1TB of cloud save</p>
            </div>
          </div>
          <p class="length-of-free">+$2/mo</p>
        </div>
        <div class="select" >
          <div class="checker">
            <input type="checkbox" />
            <div class="ps">
              <p class="sub-title">Customizable Profile</p>
              <p class="costPerYear">Custom theme on your profile</p>
            </div>
          </div>
          <p class="length-of-free">+$2/mo</p>
        </div>
      </div>
        `;
      const lengthOfFree = dynamicContent.querySelectorAll(".length-of-free");
      if (subscriptionDuration === "Yearly") {
        for (let i = 0; i < lengthOfFree.length; i++) {
          if (i == 0) {
            lengthOfFree[i].textContent = "+$10/yr";
          }
          if (i == 1) {
            lengthOfFree[i].textContent = "+$20/yr";
          }
          if (i == 2) {
            lengthOfFree[i].textContent = "+$20/yr";
          }
        }
        if (addOnBulk.length > 0) {
          for (const item of addOnBulk) {
            console.log(item.payment);
            if (item.payment === "+$1/mo") {
              item.payment = lengthOfFree[0].textContent;
            } else if (item.payment === "+$2/mo") {
              item.payment = lengthOfFree[1].textContent;
            }
          }
        }
      } else if (subscriptionDuration === "Monthly") {
        if (addOnBulk.length > 0) {
          for (const item of addOnBulk) {
            console.log(item.payment);
            if (item.payment === "+$10/yr") {
              item.payment = lengthOfFree[0].textContent;
            } else if (item.payment === "+$20/yr") {
              item.payment = lengthOfFree[1].textContent;
            }
          }
        }
      }
      const inputPack = dynamicContent.querySelectorAll("input");
      inputPack.forEach((input) => {
        input.addEventListener("change", function () {
          actualInputParent = this.parentElement.parentElement;
          if (this.checked) {
            actualInputParent.classList.add("active");
            console.log(actualInputParent);
            const serviceName =
              actualInputParent.querySelector(".sub-title").textContent;
            const payment =
              actualInputParent.querySelector(".length-of-free").textContent;
            const tData = { serviceName, payment };
            addOnBulk.push(tData);
          } else {
            actualInputParent.classList.remove("active");
            const serviceName =
              actualInputParent.querySelector(".sub-title").textContent;
            const payment =
              actualInputParent.querySelector(".length-of-free").textContent;
            const tData = { serviceName, payment };
            const index = addOnBulk.findIndex(
              (item) => item.serviceName === serviceName
            );
            addOnBulk.splice(index, 1);
          }
          console.log(addOnBulk);
        });
      });
      const selectpack = dynamicContent.querySelectorAll(".selections .select");
      if (addOnBulk.length > 0) {
        for (const element of addOnBulk) {
          for (const select of selectpack) {
            if (
              element.serviceName ==
              select.querySelector(".sub-title").textContent
            ) {
              select.classList.add("active");
              select.querySelector("input").checked = true;
            }
          }
        }
        console.log(addOnBulk);
      }

      nav.classList.add("addons");
      nav.classList.remove("finishup");
      nav.classList.remove("first");
    }

    if (counter == 3) {
      TitleContainer.innerHTML = `
        <h1 class="title"> Finishing up</h1>
        <p class="title-insight">
            Double-check everything looks OK before confirming.
        </p>
        `;
      editedContainer.classList = "summary-container";
      dynamicContent.innerHTML = `
        <div class="total-summary">
        <div class="select first-child">
          <div class="ps">
              <p class="sub-title main">Arcade Montly</p>
              <p class="costPerYear">Change</p>
          </div>
          <p class="length-of-free main">$9/mo</p>
        </div>
      </div>
      <div class="select last-child">
        <div class="ps">
            <p class="sub-title">Total(per month)</p>
        </div>
        <p class="length-of-free">+$12/mo</p>
      </div>
        
        `;

      //add event lister to Change
      const changeBtn = dynamicContent.querySelector(
        ".total-summary .first-child .ps .costPerYear"
      );
      changeBtn.addEventListener("click", function () {
        counter = 1;
        renderPages();
      });

      //level render
      const pLevel = dynamicContent.querySelector(
        ".total-summary .first-child .sub-title "
      );
      pLevel.textContent = `${planData[0].level} (${subscriptionDuration})`;
      console.log(subscriptionDuration);
      const pLevelAmount = dynamicContent.querySelector(
        ".total-summary .first-child .length-of-free "
      );
      pLevelAmount.textContent = `${planData[0].amount}`;
      //extract numbers from string and convert to integer
      levelAmount = parseInt(
        pLevelAmount.textContent.match(/\d/g).join(""),
        10
      );

      //service and cost render
      const totalSummaryDiv = dynamicContent.querySelector(".total-summary");
      const totalCostText = dynamicContent.querySelector(".last-child");
      const totalCostTextTitle = dynamicContent.querySelector(
        ".last-child .ps .sub-title"
      );
      const totalCost = dynamicContent.querySelector(
        ".last-child .length-of-free"
      );

      for (const item of addOnBulk) {
        const pItemContainer = document.createElement("div");
        pItemContainer.className = "select";
        pItemContainer.innerHTML = `
          <div class="ps">
              <p class="sub-title">${item.serviceName}</p>
          </div>
          <p class="length-of-free">${item.payment}</p> 
          `;
        totalSummaryDiv.appendChild(pItemContainer);
      }
      //check if number exists initially
      if (cost) {
        cost = 0;
      }
      //iterate through all the costs in addOnBulk array
      for (const item of addOnBulk) {
        itemNum = parseInt(item.payment.match(/\d/g).join(""), 10);
        cost += itemNum;
      }
      cost = cost + levelAmount;
      let actualString = subscriptionDuration
        .substring(0, subscriptionDuration.length - 2)
        .toLocaleLowerCase();
      totalCostTextTitle.textContent = `Total(per ${actualString})`;
      if (subscriptionDuration === "Monthly") {
        totalCost.textContent = `+$${cost}/mo`;
      } else if (subscriptionDuration === "Yearly") {
        totalCost.textContent = `+$${cost}/yr`;
      }
      nav.classList.add("finishup");
    }

    if (counter == 4) {
      rightSideOfContainer.classList.add("thank-you");
      rightSideOfContainer.innerHTML = `
        <img src="./assets/images/icon-thank-you.svg" alt="">
        <h1 class="title"> Thank you!</h1>
        <p class="title-insight">
            Thanks for confirming your subscription! We hope you have fun 
            using our platform. If you ever need support, please feel free 
            to email us at support@loremgaming.com.
        </p>   
        `;
    }
  }
}

function toggleIndicator() {
  if (counter >= 4 || counter < 0) {
    return;
  } else {
    stepIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
    stepIndicators[counter].classList.add("active");
  }
}
