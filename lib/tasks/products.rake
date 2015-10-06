namespace :products do
	task :load => :environment do
        #Launch this task with  heroku local worker  
		client = Elasticsearch::Client.new url: 'https://gjrxed8i:d90vjo077yc16uhq@fir-2971314.eu-west-1.bonsai.io'
		
		@s3 = Aws::S3::Client.new() # CREDENTIALS ARE IN .env file 	
	
		print "Excuting elastisearch query... wait please."
		
		client.search index: 'sephoraindex', body: {query: {
        filtered: {
            query:{
                bool:{
                    should: [       
                      {bool: {
                           	must_not:
                                [
                                  {terms: {brand: [ 'lit','cosmetics' ],minimum_should_match: 2}},
                                  {terms: {brand: [ 'amazing','cosmetics' ],minimum_should_match: 2}},
                                  {terms: {brand: [ 'bareminerals' ]}},
                                  {terms: {brand: [ 'benefit','cosmetics' ],minimum_should_match: 2}},
                                  {terms: {brand: [ 'butter','london' ],minimum_should_match: 2}},
                                  {terms: {brand: [ 'clarins' ]}},
                                  {terms: {brand: [ 'lancôme' ]}},
                                  {terms: {brand: [ 'tweezerman' ]}},
                                  {terms: {brand: [ 'urban','decay' ],minimum_should_match: 2}}
        
        
                                ],
                            must:{
                                term: {retailer: "sephora"}    
                            }
                         }
                      },
                      {bool: {
                            must_not:
                               [
                                 {terms: {brand: [ 'smashbox' ]}},
                                 {terms: {brand: [ 'algenist' ]}},
                                 {terms: {brand: [ 'anastasia','beverly','hills' ],minimum_should_match: 3}},
                                 {terms: {brand: [ 'becca' ]}},
                                 {terms: {brand: [ 'bliss' ]}},
                                 {terms: {brand: [ 'dr','brandt' ],minimum_should_match: 2}},
                                 {terms: {brand: [ 'eyeko' ]}},
                                 {terms: {brand: [ 'murad' ]}},
                                 {terms: {brand: [ 'stila' ]}},
                                 {terms: {brand: [ 'tarte' ]}},                                 
                                 {terms: {brand: [ 'too','faced' ],minimum_should_match: 2}}
        
                                ],
                            must:{
                                term: {retailer: "ulta"}    
                            }
                         }
                      },
                      {bool: {
                            must_not: [
        
                                 {terms: {levels: [ 'brushes','tools' ],minimum_should_match: 2}},
                                 {terms: {levels: [ 'fragrance' ],minimum_should_match: 1}},
                                                                          
                                                                          {terms: {levels: [ 'removers' ],minimum_should_match: 1}},
                                                                          {terms: {levels: [ 'moisturizers' ],minimum_should_match: 1}}
        
        
                                ],
                            must:{
                                term: {retailer: "mac"}    
                            }
                         }
                      }        
                    ]
                 }
            },
            filter:{
                bool: {
                    must: [
                         {exists: {field:"img"}}, 
                         {exists: {field:"summary.average"}}
                    ]
                }    
            }
        }
    }
}


	end
end
