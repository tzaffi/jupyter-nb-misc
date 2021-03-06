# jupyter-nb-misc

### As I learn more about Jupyter and start fill up my bag of tricks, I'll put the nuggets in this project.

## Autorun Cells ##
###Autorun Cells run automatically any time the notebook is loaded or the IPython kernel is restarted
You make a cell autorun by editing it and clicking on the lightning button in the toolbar, or using the keyboard combination ALT-x

![Autorun Cells Example](https://d2ba1wehz8pq9c.cloudfront.net/Others/autorunextension_54f07381265c4adf9b5b97c633db6a26.png)

## Execute Cells Above Button:
Shows how to create a Javascript button that will run all the cells in the notebook, above the button.

## File Picker:
Shows how to download any file on your Jupyterhub filesystem, starting at your current Notebook's path.

## SOS Unsaved:
###Are you working within a Readonly directory on Jupyterhub? Did you forget and make a lot of changes?
Are you screwed because now all your changes are lost?

### Don't worry. With this little Javascript snippet, you can save all your work to a new notebook called
`UNSAVED.ipynb`

## Notebook Cleaner:
Cleans any notebook in Jupyterhub's current working directory by removing output and execution counts.
For example, this is how the notebook `Notebook Cleaner.ipynb` looked like

### **BEFORE:**
![Before Cleaning](https://d2ba1wehz8pq9c.cloudfront.net/Others/before_a6ad952e540c4a4f9764fc187c7b7361.png)

and

### **AFTER:**
![After Cleaning](https://d2ba1wehz8pq9c.cloudfront.net/Others/after_46eef10ab2f44e05b99fe4d634060b6b.png)
