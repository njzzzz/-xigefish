import { ref, watch } from 'vue'
import { ElCalendar, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import dayjs from 'dayjs'

export default {
  setup (props, { slots }) {
    const calendar = ref()
    const globalDate = ref()
    const selectedDay = ref(0)
    const selectedMonth = ref(0)
    const selectedYear = ref()
    const monthOptions = [
      {
        value: 0,
        label: '1月'
      },
      {
        value: 1,
        label: '2月'
      },
      {
        value: 2,
        label: '3月'
      },
      {
        value: 3,
        label: '4月'
      },
      {
        value: 4,
        label: '5月'
      },
      {
        value: 5,
        label: '6月'
      },
      {
        value: 6,
        label: '7月'
      },
      {
        value: 7,
        label: '8月'
      },
      {
        value: 8,
        label: '9月'
      },
      {
        value: 9,
        label: '10月'
      },
      {
        value: 10,
        label: '11月'
      },
      {
        value: 11,
        label: '12月'
      }
    ]

    const handleDayClick = (date, type) => {
      selectedDay.value = type === 'current-month' ? date : 0
    }

    const handelYearSelect = (year) => {
      selectedYear.value = year
      const date = selectedYear.value.getFullYear() + '-' + (selectedMonth.value + 1)
      calendar.value.pickDay(dayjs(date))
    }

    const handelMonthSelect = (month) => {
      selectedMonth.value = month
      const date = selectedYear.value.getFullYear() + '-' + (selectedMonth.value + 1)
      calendar.value.pickDay(dayjs(date))
    }

    watch(globalDate, (globalDate, preGlobalDate) => {
      selectedYear.value = new Date(globalDate.substring(0, 4))
      selectedMonth.value = globalDate.substring(7, 9) - 1
    })

    return () => <ElCalendar class='cip-calendar' ref={calendar}>
      {{
        dateCell: ({ data }) => {
          let dayClassName = ''
          const date = data.date.getDate()
          const day = data.date.getDay()
          if (data.type === 'current-month') {
            if (selectedDay.value === date) {
              if ([0, 6].includes(day)) {
                dayClassName = day === 6 ? 'current-month-week actived-sat' : 'current-month-week actived-sun'
              } else {
                dayClassName = 'current-month actived'
              }
            } else {
              dayClassName = [0, 6].includes(day) ? 'current-month-week' : 'current-month'
            }
          } else {
            dayClassName = 'other-month'
          }
          return <div class={dayClassName} onClick={handleDayClick.bind(null, date, data.type)}>
            <div class='day-title'>
              <div class='day-title__left'>{date}</div>
              {
                selectedDay.value === date && data.type === 'current-month' ? <div class='day-title__right'>{slots.titleRight?.()}</div> : ''
              }
            </div>
            <div class='day-detail'>
              {slots.dayDetail?.(date)}
            </div>
          </div>
        },
        header: ({ date }) => {
          globalDate.value = date
          return <>
            {slots.headerLeft ? slots.headerLeft() : <div></div>}
            <div class='calendar__header--right'>
              <ElDatePicker
                class='year-select'
                type="year"
                modelValue={selectedYear.value}
                onUpdate:modelValue={(year) => handelYearSelect(year)}
              />
              <ElSelect class='month-select' modelValue={selectedMonth.value} onUpdate:modelValue={(month) => handelMonthSelect(month)}>
                {
                  monthOptions.map(month => <ElOption
                    key={month.value}
                    label={month.label}
                    value={month.value}
                  />)
                }
              </ElSelect>
            </div>
          </>
        }
      }}
    </ElCalendar>
  }
}
