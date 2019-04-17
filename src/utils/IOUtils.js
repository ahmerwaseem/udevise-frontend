const triggerDownload = (data, fileName, fileExt) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.${fileExt}`); 
  document.body.appendChild(link);
  link.click();
}
