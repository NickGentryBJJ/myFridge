import './StepItem.css'

export default function StepItem({step}) {
    return (
        <div className="right-step-item-wrapper">
            <div className="right-step-item-step">
                {`${step.step}. ${step.description}`}
            </div>
        </div>
    )
}
