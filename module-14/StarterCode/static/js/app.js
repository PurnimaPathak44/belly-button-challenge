//Initializing function after fetching it
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function initialize(){
    d3.json(URL).then((data)=> {
    
    console.log(data);

// Setting up a variable for sample names
    
    var id= data.names;

     // Using D3 to select the dropdown menu
    
    var display= d3.select("#selDataset");

    // Adding up the samples to dropdown menu
    
    id.forEach((sample)=>{
    
    display.append("option")
    .text(sample)
    .property("value", sample);
    
    
    })
    
    var first_sample= id[0];
    console.log(first_sample);

   
        metaData(first_sample);
        chart(first_sample);
        BubbleChart(first_sample);
    
    })
    
    }

   


    function metaData(sample) {

        // Use D3 to retrieve all of the data
        d3.json(URL).then((data) => {
    
           
            let metadata = data.metadata;
    
           
            let value = metadata.filter(result => result.id == sample);
    
          
            console.log(value)
    
            // Get the first index from the array
            let valueData = value[0];
    
           
            d3.select("#sample-metadata").html("");
    
           
            Object.entries(valueData).forEach(([key,value]) => {
    
              
                console.log(key,value);
    
                d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
            });
        });
    
    };
    

    // Creating function
    
    function chart(sample_id){
        d3.json(URL).then((chart)=> {
        console.log(sample_id);
        console.log(chart);

        // Retrieve all sample data
    
        var samples= chart.samples;



    // Filter based on the value of the sample
        var result= samples.filter(body=> body.id==sample_id);

        // Fetch the first index 
        var final_result= result[0];

         // Get the otu_ids, lables, and sample values
        var otu_ids = final_result.otu_ids;
        var otu_labels =final_result.otu_labels;
        var sample_values=final_result.sample_values;

        // Log the data to the console
        console.log(otu_ids, otu_labels, sample_values);

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Creating Bubble chart function
function BubbleChart(sample) {

    // Using D3 to retrieve all data
    d3.json(URL).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

      
        let value = sampleInfo.filter(result => result.id == sample);

        // Fetch the first index from the array
        let valueData = value[0];

        // Fetch the otu_ids, lables, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Log the data to the console
        console.log(otuIds, otuLabels, sampleValues);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
         
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

    

    
    
    function optionChanged(newsample){

    chart(newsample);

     // Log the new value
     console.log(value); 

     // Call all functions 
     metaData(value);
     chart(value);
     BubbleChart(value);


    }

     // Calling on the initialize function
     initialize();