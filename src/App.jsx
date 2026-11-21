import { useState } from 'react';
import './App.css';

function App() {
  const [adultCount, setAdultCount] = useState('');
  const [childCount, setChildCount] = useState('');
  const [drinkType, setDrinkType] = useState('refill'); // 'refill' หรือ 'bottle'
  const [waterCount, setWaterCount] = useState('');
  const [sodaCount, setSodaCount] = useState('');
  const [discountRate, setDiscountRate] = useState('0');
  const [totalAmount, setTotalAmount] = useState('0.00');

  const ADULT_PRICE = 299;
  const CHILD_PRICE = 89;
  const REFILL_PRICE = 29;
  const WATER_PRICE = 10;
  const SODA_PRICE = 25;

  // สลับประเภทเครื่องดื่ม
  const handleDrinkTypeChange = (type) => {
    setDrinkType(type);
    if (type === 'refill') {
      setWaterCount('');
      setSodaCount('');
    }
  };

  // คำนวณและ Validate UI
  const handleCalculate = () => {
    const adultRaw = adultCount.trim();
    const childRaw = childCount.trim();

    if (adultRaw === '' && childRaw === '') {
      alert('กรุณาป้อนจำนวนผู้ใหญ่ หรือจำนวนเด็ก');
      return;
    }

    const adults = adultRaw === '' ? 0 : Number(adultRaw);
    const children = childRaw === '' ? 0 : Number(childRaw);

    if (isNaN(adults) || adults < 0 || !Number.isInteger(adults)) {
      alert('กรุณาป้อนจำนวนผู้ใหญ่เป็นตัวเลขจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
      return;
    }

    if (isNaN(children) || children < 0 || !Number.isInteger(children)) {
      alert('กรุณาป้อนจำนวนเด็กเป็นตัวเลขจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
      return;
    }

    if (adults + children === 0) {
      alert('กรุณาระบุจำนวนผู้ใหญ่ หรือจำนวนเด็กอย่างน้อย 1 คน');
      return;
    }

    // ค่าอาหาร
    const foodTotal = adults * ADULT_PRICE + children * CHILD_PRICE;

    // ค่าเครื่องดื่ม
    let drinkTotal = 0;
    if (drinkType === 'refill') {
      drinkTotal = (adults + children) * REFILL_PRICE;
    } else {
      const waterRaw = waterCount.trim();
      const sodaRaw = sodaCount.trim();

      const waterQty = waterRaw === '' ? 0 : Number(waterRaw);
      const sodaQty = sodaRaw === '' ? 0 : Number(sodaRaw);

      if (isNaN(waterQty) || waterQty < 0 || !Number.isInteger(waterQty)) {
        alert('กรุณาป้อนจำนวนน้ำเปล่าเป็นตัวเลขตั้งแต่ 0 ขึ้นไป');
        return;
      }

      if (isNaN(sodaQty) || sodaQty < 0 || !Number.isInteger(sodaQty)) {
        alert('กรุณาป้อนจำนวนน้ำอัดลมเป็นตัวเลขตั้งแต่ 0 ขึ้นไป');
        return;
      }

      drinkTotal = waterQty * WATER_PRICE + sodaQty * SODA_PRICE;
    }

    // ส่วนลด (ลดเฉพาะค่าอาหาร)
    const discount = foodTotal * parseFloat(discountRate);
    const grandTotal = foodTotal - discount + drinkTotal;

    setTotalAmount(
      grandTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  // รีเซ็ตหน้าจอ
  const handleReset = () => {
    setAdultCount('');
    setChildCount('');
    setDrinkType('refill');
    setWaterCount('');
    setSodaCount('');
    setDiscountRate('0');
    setTotalAmount('0.00');
  };

  return (
    <div className="card">
      <h1 className="title">Buffet Calculator</h1>
      <p className="subtitle">คำนวณค่าอาหารบุฟเฟต์</p>

      <div className="logo-box">
        <img src="/images/logo.png" alt="แซ่บโอชา หมูกระทะ" />
      </div>

      {/* จำนวนผู้ใหญ่ */}
      <div className="form-group">
        <label htmlFor="adultCount">จำนวนผู้ใหญ่ (คนละ 299 บาท)</label>
        <input
          type="number"
          id="adultCount"
          min="0"
          value={adultCount}
          onChange={(e) => setAdultCount(e.target.value)}
        />
      </div>

      {/* จำนวนเด็ก */}
      <div className="form-group">
        <label htmlFor="childCount">จำนวนเด็ก (คนละ 89 บาท)</label>
        <input
          type="number"
          id="childCount"
          min="0"
          value={childCount}
          onChange={(e) => setChildCount(e.target.value)}
        />
      </div>

      {/* เครื่องดื่ม */}
      <fieldset className="drink-box">
        <legend>เครื่องดื่ม</legend>

        <label className="radio-label">
          <input
            type="radio"
            name="drinkType"
            checked={drinkType === 'refill'}
            onChange={() => handleDrinkTypeChange('refill')}
          />
          <span>น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)</span>
        </label>

        <label className="radio-label">
          <input
            type="radio"
            name="drinkType"
            checked={drinkType === 'bottle'}
            onChange={() => handleDrinkTypeChange('bottle')}
          />
          <span>เครื่องดื่มแบบขวด</span>
        </label>

        <div className="form-group sub-group">
          <label htmlFor="waterCount">น้ำเปล่า (ขวดละ 10 บาท)</label>
          <input
            type="number"
            id="waterCount"
            min="0"
            disabled={drinkType === 'refill'}
            value={waterCount}
            onChange={(e) => setWaterCount(e.target.value)}
          />
        </div>

        <div className="form-group sub-group no-margin">
          <label htmlFor="sodaCount">น้ำอัดลม (ขวดละ 25 บาท)</label>
          <input
            type="number"
            id="sodaCount"
            min="0"
            disabled={drinkType === 'refill'}
            value={sodaCount}
            onChange={(e) => setSodaCount(e.target.value)}
          />
        </div>
      </fieldset>

      {/* บัตรส่วนลด */}
      <div className="form-group">
        <label htmlFor="discountSelect">บัตรส่วนลด</label>
        <select
          id="discountSelect"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
        >
          <option value="0">ไม่มีส่วนลด</option>
          <option value="0.10">ส่วนลด 10%</option>
          <option value="0.15">ส่วนลด 15%</option>
          <option value="0.20">ส่วนลด 20%</option>
        </select>
        <small className="hint">ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม</small>
      </div>

      {/* ปุ่มคำนวณและรีเซ็ต */}
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={handleCalculate}>
          คำนวณ
        </button>
        <button type="button" className="btn btn-danger" onClick={handleReset}>
          รีเซ็ต
        </button>
      </div>

      {/* แสดงผลรวม */}
      <div className="result-box">
        ยอดชำระทั้งหมด: <span>{totalAmount}</span> บาท
      </div>
    </div>
  );
}

export default App;