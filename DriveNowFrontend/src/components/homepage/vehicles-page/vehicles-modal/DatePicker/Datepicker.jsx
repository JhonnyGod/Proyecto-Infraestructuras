import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./StyledDatePicker.css";

export default function StyledDatePicker({ dateRange, setDateRange }) {
  const [startDate, endDate] = dateRange;  // Usamos las fechas pasadas como props

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="datepicker-wrapper">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);  // Actualiza el estado en el componente padre
        }}
        minDate={new Date()}  // Asegúrate de que la fecha mínima sea hoy
        inline
        className="start-date-picker"
        calendarClassName="custom-calendar"
        dayClassName={() => "custom-day"}
        monthClassName={() => "custom-month"}
        weekDayClassName={() => "custom-weekday"}
        renderCustomHeader={(props) => (
          <div className="custom-header">
            <button onClick={props.decreaseMonth} disabled={props.prevMonthButtonDisabled} className="navigation-button">{"<"}</button>
            <div className="month-year-selectors">
              <select
                value={props.date.getMonth()}
                onChange={({ target: { value } }) => props.changeMonth(Number(value))}
                className="month-selector"
              >
                {months.map((month, index) => (
                  <option 
                    key={month} 
                    value={index}
                    disabled={props.date.getFullYear() === currentYear && index < currentMonth}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={props.date.getFullYear()}
                onChange={({ target: { value } }) => props.changeYear(Number(value))}
                className="year-selector"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={props.increaseMonth} disabled={props.nextMonthButtonDisabled} className="navigation-button">{">"}</button>
          </div>
        )}
      />
      {startDate && endDate && (
        <div className="date-range-display">
          <p className='desde-date'>Desde: {startDate.toLocaleDateString()}</p>
          <p className='hasta-date'>Hasta: {endDate.toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
