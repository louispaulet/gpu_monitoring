import pynvml

class GPUMonitor:
    def __init__(self):
        pynvml.nvmlInit()
        self.device = pynvml.nvmlDeviceGetHandleByIndex(0)  # First GPU

    def get_metrics(self):
        utilization = pynvml.nvmlDeviceGetUtilizationRates(self.device)
        memory = pynvml.nvmlDeviceGetMemoryInfo(self.device)
        temperature = pynvml.nvmlDeviceGetTemperature(self.device, pynvml.NVML_TEMPERATURE_GPU)

        metrics = {
            'gpu_utilization': utilization.gpu,  # Percentage
            'memory_used': memory.used / (1024 ** 2),  # Convert to MB
            'memory_total': memory.total / (1024 ** 2),
            'temperature': temperature  # Celsius
        }
        return metrics

    def __del__(self):
        pynvml.nvmlShutdown()
