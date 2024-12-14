import pynvml
import psutil

class GPUMonitor:
    def __init__(self):
        pynvml.nvmlInit()
        self.device = pynvml.nvmlDeviceGetHandleByIndex(0)

    def get_metrics(self):
        utilization = pynvml.nvmlDeviceGetUtilizationRates(self.device)
        memory = pynvml.nvmlDeviceGetMemoryInfo(self.device)
        temperature = pynvml.nvmlDeviceGetTemperature(self.device, pynvml.NVML_TEMPERATURE_GPU)
        cpu_utilization = psutil.cpu_percent(interval=None)

        metrics = {
            'gpu_utilization': utilization.gpu,
            'memory_used': memory.used / (1024 ** 2),
            'memory_total': memory.total / (1024 ** 2),
            'temperature': temperature,
            'cpu_utilization': cpu_utilization,
        }
        return metrics

    def __del__(self):
        pynvml.nvmlShutdown()
