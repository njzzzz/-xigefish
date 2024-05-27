import CipAutoComplete from '@xigefish/components/cip-autocomplete'

export default {
  setup () {
    return () => <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      <CipAutoComplete fetchSuggestions={(query, cb) => {
        cb([])
      }}></CipAutoComplete>
    </div>
  }
}
