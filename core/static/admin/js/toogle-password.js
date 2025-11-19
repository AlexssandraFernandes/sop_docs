function togglePasswordByIdSenha(fieldId, iconId) {
  const field = document.getElementById(fieldId);
  const icon = document.getElementById(iconId);

  if (!field || !icon) {
    console.error("Campo ou ícone não encontrado:", fieldId, iconId);
    return;
  }

  const isHidden = field.type === "password";

  field.type = isHidden ? "text" : "password";

  if (icon.classList.contains("sa")) {
    icon.classList.toggle("icon-eye");
    icon.classList.toggle("icon-eye-off");
  }
}

function togglePasswordByIdConfirmarSenha(fieldId, iconId) {
  const field = document.getElementById(fieldId);
  const icon = document.getElementById(iconId);

  if (!field || !icon) {
    console.error("Campo ou ícone não encontrado:", fieldId, iconId);
    return;
  }

  const isHidden = field.type === "password";

  field.type = isHidden ? "text" : "password";

  if (icon.classList.contains("sa")) {
    icon.classList.toggle("icon-eye");
    icon.classList.toggle("icon-eye-off");
  }
}



