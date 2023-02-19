import React from 'react'

export default function Donations() {
      const formUrl1 = "https://docs.google.com/forms/d/e/1FAIpQLSfOhVwyU37XieVYEo73C-MyJ1XbY_Hfcy-VB3D31d7F2Tf0Qg/viewform";
      const formUrl2 = "https://docs.google.com/forms/d/e/1FAIpQLSfACZzhpliXiEolrF0IDf89XFW_RHx7DaSZkDeDLLF618HE1A/viewform";

      return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h1 style={{ marginTop: '25px' }}>Donation Forms</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px', width: '80%' }}>
              <div style={{ width: '50%' }}>
                <h2 style={{ marginBottom: '15px' }}>Want to Get:</h2>
                <iframe src={formUrl1} style={{ width: '100%', height: '350px', border: 'none'}} />
              </div>
              <div style={{ width: '50%' }}>
                <h2 style={{ marginBottom: '15px' }}>Want to Give:</h2>
                <iframe src={formUrl2} style={{ width: '100%', height: '350px', border: 'none'}} />
              </div>
            </div>
          </div>
  )
}
