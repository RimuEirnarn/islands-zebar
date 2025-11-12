export default function GlazeWM({ glazewm, isNight }) {
  if (!glazewm) return <div className={`left island ${isNight ? 'night-glow' : ''}`}></div>
  return <div className={`left island ${isNight ? 'night-glow' : ''}`}>
    {glazewm && (
      <div className="workspaces">
        {glazewm.currentWorkspaces.map(workspace => (
          <button
            className={`workspace ${workspace.hasFocus && 'focused'} ${workspace.isDisplayed && 'displayed'}`}
            onClick={() =>
              glazewm.runCommand(
                `focus --workspace ${workspace.name}`,
              )
            }
            key={workspace.name}
          >
            {workspace.displayName ?? workspace.name}
          </button>
        ))}
      </div>
    )}
    {glazewm.isPaused && (
      <button className="paused-button" onClick={() => glazewm.runCommand('wm-toggle-pause')}>
        PAUSED
      </button>
    )}
    {glazewm.bindingModes.map(binding => (
      <button className="binding-mode" key={binding.name} onClick={() => glazewm.runCommand(`wm-disable-binding-mode --name ${binding.name}`)}>
        {binding.displayName ?? binding.name}
      </button>
    ))}

    <button className={`tilting-direction nf ${glazewm.tiltingDirection === 'horizontal' ? 'nf-md-swap_horizontal' : 'nf-md-swap_vertical'}`} onClick={() => glazewm.runCommand("toggle-tiling-direction")}>
    </button>
  </div>
}
