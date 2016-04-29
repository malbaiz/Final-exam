function MenuChoice() 
{
    if (document.getElementById("menu").value == "Get All Categories") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add A Product Category") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change A Description for A Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete A Category") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About Me!!") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
    else if (document.getElementById("menu").value == "Please select an option") 
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}


// Get All Categories
function GetCategories()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object

    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";

    //Checks that the object has returned data
     objRequest.onreadystatechange = function()
     {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
             var output = JSON.parse(objRequest.responseText);
             GenerateCategoryList(output);
        }
    }

    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateCategoryList(result)
{
     var count = 0;
    var displaytext ="<table><tr><th>Category ID</th><th>Category Name</th><th>Description</th></tr>"; //Create a table header

    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription +"</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("Categorydisplay").innerHTML = displaytext;
}






// adding new Category
function CreateNewCategory() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";

    //Collect Customer data from web page
    var categoryName = document.getElementById("catName").value;
    var categoryDescription = document.getElementById("catDescription").value;

    //Create the parameter string
    var newcategory = '{"CName":"' + categoryName + '","CDescription":"' + categoryDescription + '"}';

    //Checking for AJAx operation return
    objRequest.onreadystatechange = function() 
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
         {
            var result = JSON.parse(objRequest.responseText);
            CategoryAddingResult(result);
        }
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);

}
function CategoryAddingResult(output)
 {
     if (output.WasSuccessful== 1) 
    {
        alert("New category has been created successfully!");
    }
    else 
    {
        alert("The creation operation was Not successful!" + output.Exception);
    }
}


//Updating Category Description

function categoryUpdate() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

    //Collect Customer data from web page
    
    var CategoryID = document.getElementById("catID").value;
    var CategoryDescription = document.getElementById("categoryDescription").value;
    
    //Create the parameter string
    var category = '{"CID":"' + CategoryID + '","CDescription":"' + CategoryDescription + '"}';

    //Checking for AJAx operation return
    objRequest.onreadystatechange = function() 
    {
        if (objRequest.readyState == 4 && objRequest.status == 200) 
        {
            var result = JSON.parse(objRequest.responseText);
            CategoryUpdateResult(result);
        }
    }
 
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(category);

}
function CategoryUpdateResult(output)
{
    if (output.WasSuccessful ==1 ) {
        alert("The Updation operation was successful!");
    }
    else {
        alert("The updation operation was NOT successful!" + output.Exception);
    }
}


// Delete category

function DeleteCat() 
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";

    //Collect Customer data from web page
    var CategerID = document.getElementById("cID").value; //OrderID

    var confirmDelete = confirm("Do you want to Delete the Cutmer ID : " + CategerID + "?");
    if (confirmDelete == true) 
    {
        url+=CategerID;
        //Checking for AJAx operation return
        objRequest.onreadystatechange = function() 
        {
            if (objRequest.readyState == 4 && objRequest.status == 200) 
            {
                var result = JSON.parse(objRequest.responseText);
                DeleteCategory(result);
            }
        }

        //Start AJAX request
        objRequest.open("GET", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send();

    }
    else 
    {
        alert("The operation was Cancelled!");
    }
     
    
}
function DeleteCategory(output)
 {
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        alert("Category has been deleted successfully!");
    }
    else {
        alert("The operation was Not successful!" + output.Exception);
    }
}